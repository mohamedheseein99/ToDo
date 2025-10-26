let input = document.querySelector(".input");
let add = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
let delAll = document.querySelector(".delet");
// هنعمل قايمة فارغة لتخزين المهمات داخلها
let array = [];
// هنشوف لو فى بيانات فى مساحة التخزين العامة للمتصفح هنعرضها داخل القايمة الفارغة السابقة
if (localStorage.getItem("taskes")) {
  array = JSON.parse(localStorage.getItem("taskes"));
}
// لإحضار البيانات من مساحة التخزين فى المتصفح وعرضها داخل الصفحة Function
getData();
add.onclick = function () {
  if (input.value != "") {
    addTask(input.value); // هنعمل فنكشن عشان ندخل العناصر داخل القايمة
    input.value = ""; // إخفاء المدخلات من الحقل بعد إضافتها للقايمة
  }
};
// لعمل الحذف للمهمة من الصفحة أو لعمل إنهاء وإكمال للمهمة function
tasks.addEventListener("click", (e) => {
  // التحقق من الضغط على زرار الحذف وحذف المهمة
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    // التي تعمل حذف من مساحة تخزين المتصفح function
    delet(e.target.parentElement.getAttribute("data-id"));
  }
  // التحقق من الضغط على المهةوإكمال المهمة
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    // التي تعمل إكمال للمهمة وحفظها فى مساحة تخزين المتصفح function
    aded(e.target.getAttribute("data-id"));
    // console.log(e.target.getAttribute("data-id"));
  }
});
// اللى هنستخدمها عشان ندخل المهمة فى القايمة السابقةfunction
function addTask(task) {
  // opject إنشاء بيانات المهمة داخل
  const taske = {
    id: Date.now(),
    title: task,
    state: false,
  };
  // إضافة المهمة داخل القايمة السابقة
  array.push(taske);
  // function إضافة العناصر للصفحة من داخل القايمة باستخدام هذه ال
  addToPagge(array);
  // إضافة القيمة بالكامل إلى مساحة التخزين العامة للمتصفح
  addarrayToLocal(array);
}
// اللى هنستخدمها عشان نضيف المهمات من القايمة إلى الصفحة السابقةfunction
function addToPagge(ts) {
  // Div أولاّ نفرغ محتوي
  tasks.innerHTML = "";
  // بعد كدا نعمل لوب على كل هناصر القايمة عشان نضيفها داخل ضيف مخصص
  array.forEach((Task) => {
    // ونضيف له الخصايص وزرار المسح ونضع داخله محتوي المهمة Div نبدأ إنشاء
    let div = document.createElement("div");
    div.className = "task";
    // هنتحقق لو المهمة مكتملة نخليها معتمة
    if (Task.state) {
      div.className = "task done";
    }
    div.setAttribute("data-id", Task.id);
    div.appendChild(document.createTextNode(Task.title));
    let delet = document.createElement("span");
    delet.className = "del";
    delet.appendChild(document.createTextNode("Delete"));
    div.appendChild(delet);
    // المعمول داخل المكان المخصص للمهمات Divنضيف ال
    tasks.appendChild(div);
  });
}
function addarrayToLocal(array) {
  // JASON.stringify هنا ههنضيف القايمة للتخزين ولكن بشكل بيانات نصية باستخدام
  window.localStorage.setItem("taskes", JSON.stringify(array));
}
// تعمل على إحضار البيانات من مساحة التخزين العامة فى المتصفح  function
function getData() {
  let data = window.localStorage.getItem("taskes");
  if (data) {
    let tasks = JSON.parse(data);
    addToPagge(tasks);
  }
}
// المسوولة عن مسح المهمة من مساحة التخزين function
function delet(e) {
  array = array.filter((task) => task.id != e);
  addarrayToLocal(array);
}
function aded(id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      array[i].state == false
        ? (array[i].state = true)
        : (array[i].state = false);
    }
  }
  addarrayToLocal(array);
}
delAll.onclick = function () {
  tasks.innerHTML = "";
};
