import { InputField } from "@gapo_ui/components";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isEmpty } from "../../helpers/validator";
import { useInput } from "../../hooks/useInput";
import { RootState } from "../../store";
import { taskAction } from "../../store/slices/taskSlice";
interface  InputAddType{
  email:string,
  date:string,
  countTasks:number
}

const InputAddTask = ({email,date,countTasks}:InputAddType):JSX.Element => {
  const taskState = useInput("", isEmpty);

  const dispatch = useDispatch()

  const tasks = useSelector((state: RootState) => state.tasks.taskList);

  const onChangeNewTask = (e) => {
    taskState.setValue(e.target.value);
  };

  const onKeyDownEnter = (e) => {
    if (e.keyCode === 13) {          
      if (taskState.err() === false) {
        dispatch(taskAction({ email: email!, date, title: taskState.value }));
        taskState.reset();
      }
    }
  };

  const handleLosesFocus = (): void => {
    taskState.reset();
  };
  
  return (
    <>
      <InputField
        placeholder="Add task..."
        variant={tasks.length > 0 ? "invisible" : "outlined"}
        fullWidth
        onChange={onChangeNewTask}
        onKeyDown={onKeyDownEnter}
        value={taskState.value}
        helperText={taskState.helperText}
        error={taskState.isErr}
        onBlur={handleLosesFocus}
      />
    </>
  );
};

export default memo(InputAddTask);
