# Pomotodo

This is a todo list type app with a pomodoro timer.

## Installation

To install just clone this repository by

```bash
git clone https://github.com/vanotis720/Pomotodo
```

and install the depencies

```bash
cd Pomotodo
yarn
```

## Usage

As with any expo native react application, launch by

```bash
yarn start

```
or 
```
expo start
```


## Principle

The principle is to define a list of tasks for the day, respecting the order in which they must be done, then click on a timer to start executing the tasks.

Each task must be thought out in such a way that it can be done within 25 minutes, so it must not be too complex or too simple either.

After every 25 minutes, the task at the top of the list must either be marked as done or sent to the bottom of the list

A 5-minute break is marked and the timer restarted

After 3 sessions of 25 minutes, which is equivalent to 1h30' (the average maximum concentration time of a human) a longer break of 20' is marked...

Every 11:59 p.m. the tasks in the list that have not been manually postponed to the next day are deleted from the application to start again on a good basis.

The statistics tab allows you to know the respect of your own challenges based on:
- the number of initial tasks compared to those carried out
- the number of tasks returned to the bottom of the list due to a lack of time
- the number of tasks postponed to the next day
- and the number of tasks deleted at the end of each day.

This is therefore not only a task organization application like the others

But one that is based on tested organizational principles and methods, the main ones being:
- Planning
- the division of large tasks into smaller ones (atomic habits & confound effect)
- awareness of the limits of the human brain

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
