import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/error.middleware';

export const getProjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const projects = await prisma.legacyProject.findMany({
      where: {
        OR: [
          { createdById: userId },
          {
            members: {
              some: {
                userId: userId,
                status: 'ACTIVE',
              },
            },
          },
        ],
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        members: {
          select: {
            id: true,
            name: true,
            relationship: true,
            role: true,
            status: true,
          },
        },
        _count: {
          select: {
            conversations: true,
            stories: true,
            members: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    throw error;
  }
};

export const getProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const project = await prisma.legacyProject.findFirst({
      where: {
        id,
        OR: [
          { createdById: userId },
          {
            members: {
              some: {
                userId: userId,
                status: 'ACTIVE',
              },
            },
          },
        ],
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            conversations: true,
            stories: true,
          },
        },
      },
    });

    if (!project) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', 'Project not found');
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    throw error;
  }
};

export const createProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subjectName, subjectAge, subjectPhoto, diagnosis, diagnosisDate } = req.body;
    const userId = req.user!.id;

    const project = await prisma.legacyProject.create({
      data: {
        subjectName,
        subjectAge,
        subjectPhoto,
        diagnosis,
        diagnosisDate: diagnosisDate ? new Date(diagnosisDate) : undefined,
        createdById: userId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const updates = req.body;

    // Check if user has permission
    const project = await prisma.legacyProject.findFirst({
      where: {
        id,
        createdById: userId,
      },
    });

    if (!project) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', 'Project not found or access denied');
    }

    const updatedProject = await prisma.legacyProject.update({
      where: { id },
      data: {
        ...updates,
        diagnosisDate: updates.diagnosisDate ? new Date(updates.diagnosisDate) : undefined,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Check if user has permission
    const project = await prisma.legacyProject.findFirst({
      where: {
        id,
        createdById: userId,
      },
    });

    if (!project) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', 'Project not found or access denied');
    }

    await prisma.legacyProject.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    throw error;
  }
};

export const getProjectStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Check access
    const project = await prisma.legacyProject.findFirst({
      where: {
        id,
        OR: [
          { createdById: userId },
          {
            members: {
              some: {
                userId: userId,
                status: 'ACTIVE',
              },
            },
          },
        ],
      },
    });

    if (!project) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', 'Project not found');
    }

    // Get statistics
    const [
      totalConversations,
      completedConversations,
      totalStories,
      approvedStories,
      totalMembers,
    ] = await Promise.all([
      prisma.conversation.count({ where: { projectId: id } }),
      prisma.conversation.count({ where: { projectId: id, status: 'COMPLETED' } }),
      prisma.story.count({ where: { projectId: id } }),
      prisma.story.count({ where: { projectId: id, status: 'APPROVED' } }),
      prisma.projectMember.count({ where: { projectId: id, status: 'ACTIVE' } }),
    ]);

    // Calculate total hours from conversations
    const conversations = await prisma.conversation.findMany({
      where: { projectId: id, status: 'COMPLETED' },
      select: { duration: true },
    });

    const totalMinutes = conversations.reduce((sum, conv) => sum + conv.duration, 0);
    const totalHours = Number((totalMinutes / 60).toFixed(1));

    res.json({
      success: true,
      data: {
        conversations: {
          total: totalConversations,
          completed: completedConversations,
        },
        stories: {
          total: totalStories,
          approved: approvedStories,
        },
        hours: totalHours,
        members: totalMembers,
      },
    });
  } catch (error) {
    throw error;
  }
};