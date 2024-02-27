require("dotenv").config();
const Project = require('../models/Projects');

async function createProject(projectDetails) {
  try {
    const project = await Project.create(projectDetails);
    return project;
  } catch (error) {
    throw error;
  }
}

async function getProjectById(projectId) {
  try {
    const project = await Project.findByPk(projectId);
    return project;
  } catch (error) {
    throw error;
  }
}

async function getProjectsByUserId(userId) {
  try {
    const projects = await Project.findAll({ where: { userId } });
    return projects;
  } catch (error) {
    throw error;
  }
}

async function updateProject(projectId, projectDetails) {
  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    await project.update(projectDetails);
    return project;
  } catch (error) {
    throw error;
  }
}

async function deleteProject(projectId) {
  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    await project.destroy();
    return project;
  } catch (error) {
    throw error;
  }
}

async function getProjects() {
  try {
    const projects = await Project.findAll();
    return projects;
  } catch (error) {
    throw error;
  }
}

// Update project status by projectId
async function updateStatus(projectId, status) {
  try {
      const project = await Project.findByPk(projectId);
      if (!project) {
          throw new Error('Project not found');
      }

      // Update the status of the project
      project.status = status;
      await project.save();

      return project;
  } catch (error) {
      throw error;
  }
}

// Update project likes by projectId
async function updateLikes(projectId) {
  try {
      const project = await Project.findByPk(projectId);
      if (!project) {
          throw new Error('Project not found');
      }

      // Update the status of the project
      project.likes = project.likes + 1;
      await project.save();

      return project;
  } catch (error) {
      throw error;
  }
}


module.exports = {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByUserId,
  getProjects,
  updateStatus
};
