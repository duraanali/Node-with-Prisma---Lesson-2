import express from 'express';

import prisma from './lib/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany();
    if (ratings) {
      res.status(200).json(ratings);
    } else {
        res.status(404).json({ message: 'ratings not found' });
    }
    } catch(err) {
      res.status(500).json({ message: 'Failed to get ratings' });
    }
});

// Get Single rating
router.get('/:id', async (req, res) => {
    try {
        const rating = await prisma.rating.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });

        if(rating) {
            res.status(200).json(rating);
        } else {
            res.status(404).json({ message: 'rating not found' });
        }
    } catch(err) {
        res.status(500).json({ message: 'Failed to get rating' });
    }
});

// Add rating
router.post('/', async (req, res) => {
    try {
        const rating = await prisma.rating.create({
            data: req.body,
        });

        if (rating) {
            res.status(201).json(rating);
        } else {
            res.status(404).json({ message: 'rating not found' });
        }
    } catch(err) {
        res.status(500).json({ message: 'Failed to add rating' });
    }
});

// Update rating
router.put('/:id', async (req, res) => {
    try {
        const rating = await prisma.rating.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        });

        if(rating) {
            res.status(200).json(rating);
        } else {
            res.status(404).json({ message: 'rating not found' });
        }
    } catch(err) {
        res.status(500).json({ message: 'Failed to update rating' });
    }
});

// Delete rating
router.delete('/:id', async (req, res) => {
    try {
        const rating = await prisma.rating.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        if(rating) {
            res.status(200).json({ message: 'rating deleted' });
        } else {
            res.status(404).json({ message: 'rating not found' });
        }
    } catch(err) {
        res.status(500).json({ message: 'Failed to delete rating' });
    }
});

export default router;
