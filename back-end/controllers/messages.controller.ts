import { messageService } from '../services';
import catchAsync from '../utils/catchAsync';

const fetchAllTasks = catchAsync(async (req, res) => {
  const data = await messageService.getAllTasks();
  res.send(data);
});

export default {
  fetchAllTasks,
};
