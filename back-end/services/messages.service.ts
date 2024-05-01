import { Message } from '../models';

const getAllTasks = async () => {
  const data = await Message.find({});
  return data;
};

export default { getAllTasks };
