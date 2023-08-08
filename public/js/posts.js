// Fetch call to create new post
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
            document.location.reload();
        })
        .catch((error) => {
            console.error("Error adding post: ", error);
        });
    }
};

// Fetch call to update a post
const updatePostHandler = async (event) => {
    event.preventDefault();

    console.log(event);

    const postID = event.target.id;
    const title = event.target[0].value;
    console.log("Updated Title: " + title);
    const text = event.target[1].value;
    console.log("Updated Text: " + text);

    if (postID)
    {
        if (title || text)
        {
            await fetch(`/api/dashboard/${postID}`, {
                method: 'PUT',
                body: JSON.stringify({ title, text, fullDate }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("Successfully updated post: ", data);
                document.location.reload();
            })
            .catch((error) => {
                console.error("Error updating post: ", error);
            });
        }
    }
};

// Fetch call to delete a post
const deletePostHandler = async (event) => {
    event.preventDefault();

    const postID = event.target.id;

    await fetch(`/api/dashboard/${postID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("Successfully deleted post: " + data);
        document.location.reload();
    })
    .catch((error) => {
        console.error("Error deleting post: " + error);
    })
};

// Only listen for form submit and button clicks when on dashboard page
if (window.location.pathname.includes("/api/dashboard"))
{
    document.querySelector('#newPostForm').addEventListener("submit", addNewPostHandler);

    const updatePostButton = document.querySelectorAll('.updatePost');
    const deletePostButton = document.querySelectorAll('.deletePost');

    if (updatePostButton && deletePostButton)
    {
        for (let i = 0; i < updatePostButton.length; i++)
        {
            updatePostButton[i].addEventListener("click", function() {
                const updateForms = document.querySelectorAll('.updatePostForm');
                updateForms[i].hidden = false;

                updateForms[i].addEventListener("submit", updatePostHandler);
            });

            deletePostButton[i].addEventListener("click", deletePostHandler);
        }
    }
}

console.log("posts.js is connected");