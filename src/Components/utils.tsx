import { User } from "./User";
import { format, addHours } from "date-fns";

 // This function filters the users for today's date
  function todaysUsers(users: User[]) {
    console.log(users);
    const today = new Date();
    return users.filter((user) => {
      const userTime = new Date(user.date);
      return userTime.getDate() === today.getDate();
    });
  }



	// This function sorts users by date
	 function sortUsers(users: User[]) {
		const sortedUsers = users.sort((a, b) => {
			const aTime: any = new Date(a.date);
			const bTime: any = new Date(b.date);
			return aTime - bTime;
		});
		return sortedUsers;
	}

   function formatDate(date: Date) {
		const dateObj = new Date(date);
		const formattedDate = format(dateObj, "MM/dd/yyyy h:mm a");
		return formattedDate;
	}

	// This function formats the date into a better to read time format
  function formatTime(time: Date) {
    const date: Date = new Date(time);
    return format(date, "h:mm a");
  }

  

	 function userNxtHrTime(user: User) {
		let now = new Date();
     const userTime: Date = new Date(user.date);
     const userNxtHr: Date = addHours(userTime, 1);
     if (now > userTime && now < userNxtHr) {
       return true;
     } 
	 return false;
   }

   export { todaysUsers, sortUsers, formatDate, formatTime, userNxtHrTime };