init().then();


async function init() {
  const db = await fetchDb();
  console.log(db);
}

function fetchDb() {
  return fetch('assets/db.json')
    .then(response => response.json());
}
