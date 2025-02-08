const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.post('/', communityController.createCommunity);
router.get('/', communityController.getAllCommunities);
router.get('/:id', communityController.getCommunityById);
router.put('/:id/add-member', communityController.addMember);

module.exports = router;
