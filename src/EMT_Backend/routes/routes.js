//import express 
import express from "express";

//import functions drom controller 
import {
    showCompetences,
    showCompetenceById,
    createCompetence,
    updateCompetence,
    deleteCompetence,
} from "../controllers/competence.js";
import {
    showResources,
    showResourceById,
    createResource,
    updateResource,
    deleteResource,
} from "../controllers/resource.js";
import {
    showRoles,
    showRoleById,
    createRole,
    updateRole,
    deleteRole,
} from "../controllers/role.js";
import {
    showStatus,
    showStatusById,
    createStatus,
    updateStatus,
    deleteStatus,
} from "../controllers/status.js";
import {
    showUsers,
    showUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.js";

//init express router 
const router = express.Router();

// ----- Competence Endpoints -----

//get all competence
router.get("/competences", showCompetences);

//get single competence
router.get("/competence/:id", showCompetenceById);

// Create New Competence
router.post("/competence", createCompetence);

// Update Competence
router.put("/competence/:id", updateCompetence);

// Delete Competence
router.delete("/competence/:id", deleteCompetence);

// ----- Resource Endpoints -----

//get all resources
router.get("/resources", showResources);

//get single resource
router.get("/resource/:id", showResourceById);

// Create New resource
router.post("/resource", createResource);

// Update resource
router.put("/resource/:id", updateResource);

// Delete resource
router.delete("/resource/:id", deleteResource);

// ----- Role Endpoints -----

//get all roles 
router.get("/roles", showRoles);

//get single role
router.get("/role/:id", showRoleById);

// Create New role
router.post("/role", createRole);

// Update role
router.put("/role/:id", updateRole);

// Delete role
router.delete("/role/:id", deleteRole);

// ----- Status Endpoints -----

//get all status
router.get("/status", showStatus);

//get single status
router.get("/status/:id", showStatusById);

// Create New status
router.post("/status", createStatus);

// Update status
router.put("/status/:id", updateStatus);

// Delete status
router.delete("/status/:id", deleteStatus);

// ----- User Endpoints -----

//get all user
router.get("/users", showUsers);

//get single user
router.get("/user/:id", showUserById);

// Create New User
router.post("/user", createUser);

// Update User
router.put("/user/:id", updateUser);

// Delete User
router.delete("/user/:id", deleteUser);

export default router; 
