const formHandlerLogin = async (e) => {
e.preventDefault();
const pwd = document.getElementById('#loginPwd').value.trim();
const email = document.getElementById('#emailId').value.trim();
const personName = document.getElementById('#personName').value.trim();
if(email && pwd) {
    const response = await fetch('/api/user/login', {
        method:'POST',
        body:JSON.stringify({email, pwd}),
        headers: {'Content-Type': 'application/json'},
    });
if(response.ok){
    document.location.replace('/profile');
}else{
    alert(response.statusText);
}
}
};
const formHandlersignup = async (e) => {
    e.preventDefault();
    const pwd = document.getElementById('#loginPwd').value.trim();
    const email = document.getElementById('#emailId').value.trim();
    const personName = document.getElementById('#personName').value.trim();
    if(email && pwd && personName) {
        const response = await fetch('/api/user', {
            method:'POST',
            body:JSON.stringify({email, pwd, personName}),
            headers: {'Content-Type': 'application/json'},
        });
    if(response.ok){
        document.location.replace('/profile');
    }else{
        alert(response.statusText);
    }
    }
    };

    document.querySelector('.signForm').addEventListener('submit', formHandlerLogin);
    document.querySelector('.signUp').addEventListener('submit', formHandlersignup);
    