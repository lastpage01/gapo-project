export interface Task {
  _id: string;
  id: number;
  title: string;
  status: boolean;
  vt: number;
  email: string;
  date: string;
}

export interface TaskAction {
  email: string;
  date: string;
  title?: string;
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
