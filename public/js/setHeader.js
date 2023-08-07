const pageHeader = document.querySelector('#page-header');

if (document.location.pathname == "/")
{
    pageHeader.textContent = "The Tech Blog";
}

else if (document.location.pathname == "/api/dashboard")
{
    pageHeader.textContent = "Dashboard";
}

else if (document.location.pathname == "/login")
{
    pageHeader.textContent = "Login or Sign Up";
}

else if (document.location.pathname.includes("/api/posts"))
{
    pageHeader.textContent = "The Tech Blog"
}