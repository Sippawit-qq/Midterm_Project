import subjects from "../data/name_subject.json" assert { type: "json" };
import location from "../data/location.json" assert { type: "jsopn"};
import hobbies from "../data/hobbies.json" assert { type: "jsopn" };

export function getRandomSubjects(count) {
  const shuffled = [...subjects].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getRandomLocation() {
  const statesArray = Object.values(location.state);

  // Random state
  const randomState =
    statesArray[Math.floor(Math.random() * statesArray.length)];

  // Random city from selected state
  const randomCity =
    randomState.city[Math.floor(Math.random() * randomState.city.length)];

  return {
    state: randomState.name,
    city: randomCity,
  };
}

export function getRandomHobbies(count) {
  const shuffled = [...hobbies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
