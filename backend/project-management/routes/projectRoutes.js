const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');
const verifyToken = require('../middleware/authMiddleware')

// Create project
router.post('/project', verifyToken, async (req, res) => {
  try {
    const newProject = await projectService.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

// Get project by ID
router.get('/project/:projectId', verifyToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Error fetching project' });
  }
});

// Get projects
router.get('/projects', verifyToken, async (req, res) => {
  try {
    const projects = await projectService.getProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});


// Update project
router.put('/project/:projectId', verifyToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedProject = await projectService.updateProject(projectId, req.body);
    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});

// Delete project
router.delete('/project/:projectId', verifyToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    await projectService.deleteProject(projectId);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
});

// GET projects by rollNo
router.get('/projects/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Query projects where rollNo is equal to the provided value
    const projects = await projectService.getProjectsByUserId(userId);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// PATCH route to update project status
router.patch('/project/:projectId', verifyToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.body;

    // Update the status of the project
    const updatedProject = await projectService.updateStatus(projectId, status);

    return res.status(200).json({ message: 'Project status updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error updating project status:', error);
    return res.status(500).json({ error: 'Error updating project status' });
  }
});

// PATCH route to update project likes
router.patch('/project/:projectId', verifyToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    // Update the status of the project
    const updatedProject = await projectService.updateLikes(projectId, status);

    return res.status(200).json({ message: 'Liked updated successfully', project: updatedProject });
  } catch (error) {
    console.error('Error liking project:', error);
    return res.status(500).json({ error: 'Error liking project' });
  }
});

module.exports = router;
