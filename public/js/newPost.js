const addNewPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#postTitleInput').value;
    const text = document.querySelector('#postTextInput').value;

    if (title && text)
    {
        await fetch(`/api/dashboard`, {
            method: 'POST',
            body: JSON.stringify({ title, text, fullDate }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Successfully added post: ", data);
            // document.location.reload();
        })
        .catch((error) => {
            console.error("Error adding post: ", error);
        });
    }
};

// Only listen for form submit when on dashboard page
if (window.location.pathname.includes("/api/dashboard"))
{
    document.querySelector('#newPostForm').addEventListener("submit", addNewPostHandler);
}

console.log("newPost.js is connected");