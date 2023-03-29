export interface TaskItemType {
  _id: string;
  id: number;
  title: string;
  status: boolean;
  vt: number;
  email: string;
  date: string;
}
export interface TaskState {
  taskList: TaskItemType[];
  isTask: boolean;
}

export interface TaskAction {
  email: string;
  date: string;
  isMoveDate?: boolean;
  title?: string;
  page?: number;
  limit?: number;
}
export interface TaskRetrieve {
  taskList: TaskItemType[];
  isMoveDate: boolean;
  isTask: boolean;
}

export interface TaskUpdate {
  id: string;
  title: string;
  status?: boolean;
}

export interface TaskMove {
  id: string;
  vtOld: number;
  vtNew: number;
}
export interface TaskMoveSuccess {
  vtOld: number;
  vtNew: number;
}
