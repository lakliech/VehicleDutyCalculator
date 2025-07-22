import express from 'express';
import { z } from 'zod';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { userRoles, appUsers, userRoleSchema } from '../../shared/schema';
import { authenticateUser, requireRole } from '../middleware/auth';

const router = express.Router();

// Get all roles
router.get('/roles', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const roles = await db
      .select()
      .from(userRoles)
      .orderBy(userRoles.name);

    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

// Get all users with their roles
router.get('/users-with-roles', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const usersWithRoles = await db
      .select({
        id: appUsers.id,
        email: appUsers.email,
        firstName: appUsers.firstName,
        lastName: appUsers.lastName,
        phoneNumber: appUsers.phoneNumber,
        roleId: appUsers.roleId,
        status: appUsers.status,
        isActive: appUsers.isActive,
        lastLoginAt: appUsers.lastLoginAt,
        createdAt: appUsers.createdAt,
        role: {
          id: userRoles.id,
          name: userRoles.name,
          description: userRoles.description,
          permissions: userRoles.permissions
        }
      })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .orderBy(appUsers.createdAt);

    res.json(usersWithRoles);
  } catch (error) {
    console.error('Error fetching users with roles:', error);
    res.status(500).json({ error: 'Failed to fetch users with roles' });
  }
});

// Create new role
router.post('/roles', authenticateUser, requireRole(['super_admin']), async (req, res) => {
  try {
    const validation = userRoleSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid role data', 
        details: validation.error.issues 
      });
    }

    const roleData = validation.data;
    
    // Check if role name already exists
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.name, roleData.name))
      .limit(1);

    if (existingRole.length > 0) {
      return res.status(400).json({ error: 'Role name already exists' });
    }

    const [newRole] = await db
      .insert(userRoles)
      .values(roleData)
      .returning();

    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      role: newRole
    });

  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Failed to create role' });
  }
});

// Update role
router.put('/roles/:id', authenticateUser, requireRole(['super_admin']), async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    
    if (isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    const validation = userRoleSchema.partial().safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ 
        error: 'Invalid role data', 
        details: validation.error.issues 
      });
    }

    const updateData = validation.data;

    // Check if role exists
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.id, roleId))
      .limit(1);

    if (existingRole.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    const [updatedRole] = await db
      .update(userRoles)
      .set(updateData)
      .where(eq(userRoles.id, roleId))
      .returning();

    res.json({
      success: true,
      message: 'Role updated successfully',
      role: updatedRole
    });

  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({ error: 'Failed to update role' });
  }
});

// Delete role
router.delete('/roles/:id', authenticateUser, requireRole(['super_admin']), async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    
    if (isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    // Check if role exists
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.id, roleId))
      .limit(1);

    if (existingRole.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Check if any users are assigned to this role
    const usersWithRole = await db
      .select()
      .from(appUsers)
      .where(eq(appUsers.roleId, roleId))
      .limit(1);

    if (usersWithRole.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete role that is assigned to users. Please reassign users first.' 
      });
    }

    await db
      .delete(userRoles)
      .where(eq(userRoles.id, roleId));

    res.json({
      success: true,
      message: 'Role deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ error: 'Failed to delete role' });
  }
});

// Update user role
router.put('/users/:userId/role', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const userId = req.params.userId;
    const { roleId } = req.body;

    if (!roleId || isNaN(parseInt(roleId))) {
      return res.status(400).json({ error: 'Valid role ID is required' });
    }

    // Check if user exists
    const existingUser = await db
      .select()
      .from(appUsers)
      .where(eq(appUsers.id, userId))
      .limit(1);

    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if role exists
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.id, parseInt(roleId)))
      .limit(1);

    if (existingRole.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    // Update user role
    const [updatedUser] = await db
      .update(appUsers)
      .set({ 
        roleId: parseInt(roleId),
        updatedAt: new Date()
      })
      .where(eq(appUsers.id, userId))
      .returning();

    res.json({
      success: true,
      message: 'User role updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

// Get role permissions
router.get('/roles/:id/permissions', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    
    if (isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    const role = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.id, roleId))
      .limit(1);

    if (role.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.json({
      roleId: role[0].id,
      roleName: role[0].name,
      permissions: role[0].permissions || []
    });

  } catch (error) {
    console.error('Error fetching role permissions:', error);
    res.status(500).json({ error: 'Failed to fetch role permissions' });
  }
});

// Update role permissions
router.put('/roles/:id/permissions', authenticateUser, requireRole(['super_admin']), async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);
    const { permissions } = req.body;
    
    if (isNaN(roleId)) {
      return res.status(400).json({ error: 'Invalid role ID' });
    }

    if (!Array.isArray(permissions)) {
      return res.status(400).json({ error: 'Permissions must be an array' });
    }

    // Check if role exists
    const existingRole = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.id, roleId))
      .limit(1);

    if (existingRole.length === 0) {
      return res.status(404).json({ error: 'Role not found' });
    }

    const [updatedRole] = await db
      .update(userRoles)
      .set({ permissions })
      .where(eq(userRoles.id, roleId))
      .returning();

    res.json({
      success: true,
      message: 'Role permissions updated successfully',
      role: updatedRole
    });

  } catch (error) {
    console.error('Error updating role permissions:', error);
    res.status(500).json({ error: 'Failed to update role permissions' });
  }
});

// Get role statistics
router.get('/roles/stats', authenticateUser, requireRole(['admin', 'super_admin']), async (req, res) => {
  try {
    // Get user count per role
    const roleStats = await db
      .select({
        roleId: appUsers.roleId,
        roleName: userRoles.name,
        userCount: db.$count(appUsers.id)
      })
      .from(appUsers)
      .leftJoin(userRoles, eq(appUsers.roleId, userRoles.id))
      .groupBy(appUsers.roleId, userRoles.name);

    // Get total roles and users
    const totalRoles = await db.$count(userRoles.id);
    const totalUsers = await db.$count(appUsers.id);

    res.json({
      totalRoles,
      totalUsers,
      roleDistribution: roleStats
    });

  } catch (error) {
    console.error('Error fetching role statistics:', error);
    res.status(500).json({ error: 'Failed to fetch role statistics' });
  }
});

export default router;