function skillsMember() {
    var skills = document.getElementById("skills");
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("memberSkills");

    memberSkills.innerHTML = "";

    if (member.value == "1") {
        skills.innerHTML = "<option value='1'>HTML</option><option value='2'>CSS</option><option value='3'>JavaScript</option>";
    } else if (member.value == "2") {
        skills.innerHTML = "<option value='4'>PHP</option><option value='5'>MySQL</option><option value='6'>Python</option>";
    } else if (member.value == "3") {
        skills.innerHTML = "<option value='7'>Java</option><option value='8'>C++</option><option value='9'>C#</option>";
    } else {
        skills.innerHTML = "<option value='0'>No skills</option>";
    }
}