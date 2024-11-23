let tasks = [];

module.exports = {
    getAll(req, res) {
        console.log(req);
        res.json(tasks);
    },
    create(req, res) {
        const { task } = req.body;
        console.log(res.body);
        const newTask = { id: tasks.length + 1, task, done: false };
        tasks.push(newTask);
        res.status(201).json(newTask);
    },
    markAsDone(req,res) {
        const { id } = req.params;
        tasks = tasks.map((task) =>
            task.id == id ? { ...task, done: true } : task,
        );
        res.status(204).end();
    },
};