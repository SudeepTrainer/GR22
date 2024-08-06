import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardFooter, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { format, set } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Filter from 'bad-words';

export function Playground() {

    const [date, setDate] = useState(new Date());

    const [hour, setHour] = useState("00");

    const [minute, setMinute] = useState("00");

    const [AMPM, setAMPM] = useState("AM");

    const [todos, setTodos] = useState([]);

    const { toast } = useToast();

    const [newTodo, setNewTodo] = useState({
        time: "",
        title: "",
        description: "",
        completed: null,
    })

    const handleAddTodo = () => {

        if (!newTodo.title || newTodo.title.trim() === "") {
            toast({
                title: "Title is Empty",
                description: "Please enter a title for the todo",
            });
            return;
        } else if (!newTodo.description || newTodo.description.trim() === "") {
            toast({
                title: "Description is Empty",
                description: "Please enter a description for the todo",
            });
            return;
        } else if (date === null || date === undefined) {
            toast({
                title: "Date is Empty",
                description: "Please select a date before adding todo",
            });
            return;
        }
        else if (hour === null || hour === undefined) {
            toast({
                title: "Hour is Empty",
                description: "Please select a hour before adding todo",
            });
            return;
        }
        else if (minute === null || minute === undefined) {
            toast({
                title: "Minute is Empty",
                description: "Please select a minute before adding todo",
            });
            return;
        }
        else if (AMPM === null || AMPM === undefined) {
            toast({
                title: "AM/PM is Empty",
                description: "Please select AM/PM before adding todo",
            });
            return;
        }

        // filter words
        const filter = new Filter();
        if (filter.isProfane(newTodo.title) || filter.isProfane(newTodo.description)) {
            toast({
                title: "Bad Words",
                description: "Please remove bad words from the title and/or description",
            });
            return;
        }

        if (newTodo.title.trim() !== "") {

            const todoTime = `${hour}:${minute} ${AMPM} - ${format(date, "PPP")}`;
            const newTodoItem = {
                ...newTodo,
                time: todoTime,
                completed: false,
            };
            setTodos([...todos, newTodoItem]);
            setNewTodo({
                time: "",
                title: "",
                description: "",
                completed: false,
            });
            toast({
                title: "Todo Added",
                description: "Your todo has been added successfully",
            });
        }
    }

    const handleDeleteTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos)
        toast({
            title: "Todo Deleted",
            description: "Your todo has been deleted successfully",
        });
    }

    const handleToggleTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
        console.log("up", updatedTodos);
        toast({
            title: "Todo Updated",
            description: "Your todo has been updated successfully",
        });
    }

    // on any change in todos, print it
    useEffect(() => {
        console.log(todos);
    }, [todos]);

    return (
        (<Card className="max-w-md mx-auto p-6 space-y-6 mt-10">

            <Card className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-[1fr_auto] gap-4">
                    <Popup date={date} hour={hour} minute={minute} AMPM={AMPM} setDate={setDate} setHour={setHour} setMinute={setMinute} setAMPM={setAMPM} />

                    <Input
                        type="text"
                        placeholder="Title"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    />
                </div>
                <Textarea
                    placeholder="Description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                />
                <Button onClick={handleAddTodo}>Add Todo</Button>
            </Card>
            <Toaster />
            <Card className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4 overflow-auto max-h-[34vh]"
                style={{ scrollbarWidth: "none" }}
            >
                {todos.length === 0 || todos === null || todos === undefined ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <NotFoundIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-500 dark:text-gray-400">No Todos Found</span>
                    </div>
                ) :
                    (
                        todos.map((todo, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 ${todo.completed ? "opacity-50 line-through text-gray-500 dark:text-gray-400" : ""
                                    }`}
                            >
                                <Checkbox checked={todo.completed} onClick={() => handleToggleTodo(index)} />
                                <div className="space-y-1">
                                    <div className="font-medium truncate max-w-[230px]">{todo.title}</div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        <div className="truncate max-w-[210px] text-sm"
                                        >
                                            {todo.time}
                                        </div>
                                        <div className="truncate max-w-[210px] text-sm"
                                        >
                                            {todo.description}
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteTodo(index)}>
                                    <Trash2Icon className="w-5 h-5" />
                                </Button>
                            </div>
                        )))}
            </Card>
        </Card>)
    );
}

function Popup({ date, hour, minute, AMPM, setDate, setHour, setMinute, setAMPM }) {

    const [open, setOpen] = useState(false);

    const { toast } = useToast();

    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedHour, setSelectedHour] = useState(hour);
    const [selectedMinute, setSelectedMinute] = useState(minute);
    const [selectedAMPM, setSelectedAMPM] = useState(AMPM);

    const buttonClicked = () => {
        setSelectedDate(date);
        setSelectedHour(hour);
        setSelectedMinute(minute);
        setSelectedAMPM(AMPM);
    }

    const CancelClicked = () => {
        setOpen(false);

        toast({
            title: "Cancelled",
            description: "All changes have been cancelled",
        });
    }

    const ConfirmClicked = () => {
        setHour(selectedHour);
        setMinute(selectedMinute);
        setAMPM(selectedAMPM);
        setDate(selectedDate);

        setOpen(false);

        toast({
            title: "Selected Time and Date",
            description: "Time and Date has been selected",
        });

    }


    return (
        <Dialog open={open} onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full" onClick={buttonClicked}
                >
                    <span className="text-gray-500 dark:text-gray-400"
                    >
                        {hour}:{minute} {AMPM} - {format(date, "PPP")}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Time and Date</DialogTitle>
                    <DialogDescription>Choose a time and date for your event</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "col-span-1 w-auto justify-start text-left font-normal",
                                    "text-muted-foreground text-black"
                                )}
                            >
                                <ClockIcon className="mr-2 h-4 w-4" />
                                {hour !== null && minute !== null && AMPM != null ? `${selectedHour}:${selectedMinute} ${selectedAMPM}` : "Pick a Time"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <div className="grid grid-cols-3 gap-4 p-4"
                            >
                                <Select onValueChange={(value) => { setSelectedHour(value); }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Hour"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[50vh]"
                                    >
                                        <SelectItem value="00">00</SelectItem>
                                        <SelectItem value="01">01</SelectItem>
                                        <SelectItem value="02">02</SelectItem>
                                        <SelectItem value="03">03</SelectItem>
                                        <SelectItem value="04">04</SelectItem>
                                        <SelectItem value="05">05</SelectItem>
                                        <SelectItem value="06">06</SelectItem>
                                        <SelectItem value="07">07</SelectItem>
                                        <SelectItem value="08">08</SelectItem>
                                        <SelectItem value="09">09</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="11">11</SelectItem>
                                    </SelectContent>

                                </Select>
                                <Select onValueChange={(value) => { setSelectedMinute(value); }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Minutes" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[50vh]"
                                    >
                                        <SelectItem value="00" >00</SelectItem>
                                        <SelectItem value="05">05</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="15">15</SelectItem>
                                        <SelectItem value="20" >20</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="30" >30</SelectItem>
                                        <SelectItem value="35" >35</SelectItem>
                                        <SelectItem value="40" >40</SelectItem>
                                        <SelectItem value="45">45</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="55">55</SelectItem>
                                    </SelectContent>

                                </Select>

                                <Select onValueChange={(value) => { setSelectedAMPM(value); }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="AM/PM" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[50vh]"
                                    >
                                        <SelectItem value="AM" >AM</SelectItem>
                                        <SelectItem value="PM">PM</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                        </PopoverContent></Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "col-span-1 w-auto justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex justify-end mt-4">
                    <Button onClick={CancelClicked}
                        variant="destructive">Cancel</Button>
                    <Button onClick={ConfirmClicked}
                        className="ml-4">Confirm</Button>
                </div>
            </DialogContent>
        </Dialog >
    )
}

function Trash2Icon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
    )
}

function ClockIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}

function NotFoundIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12" y1="16" y2="16" />
        </svg>
    )
}

function CalendarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
}