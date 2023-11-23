import lodash from 'lodash'
import celebResolvers from './celebResolvers.js';
import movieResolvers from './movieResolvers.js';
import reviewResolvers from './reviewResolvers.js';

const myresolver = {}

const resolvers = lodash.merge(myresolver, celebResolvers, movieResolvers, reviewResolvers);

export default resolvers;