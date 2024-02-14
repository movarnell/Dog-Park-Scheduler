// FILEPATH: /Users/michaelvarnell/FrontEnd/Dog Park 2024/Dog-Park-Scheduler/src/Components/utils.test.tsx

import {
  todaysUsers,
  sortUsers,
  formatDate,
  formatTime,
  userNxtHrTime,
} from "./utils";
import { User } from "./User";
import { addHours } from "date-fns";

describe("Utility Functions", () => {
  const users: User[] = [
    {
      id: 1,
      name: "User 1",
      date: new Date(),
      dogName: "",
      friendly: true,
      puppy: false,
    },
    {
      id: 2,
      name: "User 2",
      date: new Date().toISOString(),
      dogName: "",
      friendly: true,
      puppy: false,
    },
    {
      id: 3,
      name: "User 3",
      date: new Date(2023, 1, 1).toISOString(),
      dogName: "",
      friendly: true,
      puppy: false,
    },
  ];

  it("filters today's users", () => {
    const result = todaysUsers(users);
    expect(result.length).toBe(2);
  });

  it("sorts users by date", () => {
    const result = sortUsers(users);
    expect(result[0].id).toBe(3);
  });

  it("formats date correctly", () => {
    const date = new Date(2022, 11, 31, 23, 59);
    const result = formatDate(date);
    expect(result).toBe("12/31/2022 11:59 PM");
  });

  it("formats time correctly", () => {
    const date = new Date(2022, 11, 31, 23, 59);
    const result = formatTime(date);
    expect(result).toBe("11:59 PM");
  });

  it("checks if user is in the next hour", () => {
    let datePlus30Min = new Date();
    
    const user: User = {
      id: 1,
      name: "User 1",
      date: datePlus30Min,
      dogName: "",
      friendly: 0,
      puppy: 0,
    };
    const result = userNxtHrTime(user);
    console.log(result, user);
    expect(result).toBe(true);
  });
});
