const { Food, index, User, Workout, Positive} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    food: async () => {
      console.log('i was hit: food query');
      const data = await Food.find();
      console.log(data);
      console.log(
        '-----------------------------------------------------------'
      );
      return data;
      // return await Food.find();
    },
    workout: async () => {
      console.log('i was hit: workout query');
      const data = await Workout.find();
      console.log(data);
      console.log(
        '-----------------------------------------------------------'
      );
      return data;
      // return await Workout.find();
    },
    users: async () => {
      // return User.find().populate('positives');
      const data = await User.find();
      return data;
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('positives');
    },
    positives: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Positive.find(params).sort({ createdAt: -1 });
    },
    positive: async (parent, { positiveId }) => {
      return Positive.findOne({ _id: positiveId });
    },
   },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
  
      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
  
      const token = signToken(user);
      return { token, user };
    },
  
    addPositive: async (parent, { positiveText, positiveAuthor }) => {
      const positive = await Positive.create({ positiveText, positiveAuthor });

      await User.findOneAndUpdate(
        { username: positiveAuthor },
        { $addToSet: { positives: positive._id } }
      );

      return positive;
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    removePositive: async (parent, { positiveId }) => {
      return Positive.findOneAndDelete({ _id: positiveId });
    },
  }
}


module.exports = resolvers;
