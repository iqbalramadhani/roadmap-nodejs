function p(delay, val) {
  return new Promise(res => setTimeout(() => res(val), delay));
}

async function main() {
  console.time("parallel");
  const [a, b] = await Promise.all([p(1000, "A"), p(1200, "B")]);
  console.timeEnd("parallel");
  console.log(a, b);
}
main();

function fetchWriteError(){
  return new Promise((res, rej) => {
    setTimeout(() => rej(new Error("fetch failed")), 500);
  });
}

async function run(){
  try {
    await fetchWriteError();
  } catch (error) {
    console.log("Handled error:", error.message);
  }
}

run();