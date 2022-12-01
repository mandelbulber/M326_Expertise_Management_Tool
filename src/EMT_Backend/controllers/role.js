//import functions from model 
import {
    getRoles,
    getRoleById,
    insertRole,
    updateRoleById,
    deleteRoleById,
} from "../models/roleModel.js";

//get all roles 
export const showRoles = (req, res) => {
    getRoles((err, results) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(results);
        }
    });
};

//get single role
export const showRoleById = (req, res) => {
    getRoleById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

//create new role
export const createRole = (req, res) => {
    const data = req.body;
    insertRole(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Update role
export const updateRole = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateRoleById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// Delete role
export const deleteRole = (req, res) => {
    const id = req.params.id;
    deleteRoleById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};
