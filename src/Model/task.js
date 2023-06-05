export class TaskObject {
    constructor(idUser, idTask, taskName, taskDate, taskDateCreated, stateTask) {
        this.idUser = idUser;
        this.idTask = idTask;
        this.taskName = taskName;
        this.taskDate = taskDate;
        this.taskDateCreated = taskDateCreated;
        this.stateTask = stateTask;
    }
}
