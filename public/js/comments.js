// Get current date in mm/dd/yyyy format
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const fullDate = `${month}/${day}/${year}`;

// Add a comment to post
const addCommentHandler = async (event) => {
    event.preventDefault();

    const currentURL = window.location.href;
    const postID = currentURL.split('/').at(-1);

    const commentText = document.querySelector('#commentInput').value;

    if (commentText)
    {
        await fetch(`/api/posts/${postID}`, {
            method: 'POST',
            body: JSON.stringify({ commentText, fullDate }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Successfully added comment: ", data);
            document.location.reload();
        })
        .catch((error) => {
            console.error("Error adding comment: ", error);
        });
    }
};

// Only listen for form submit when on posts pages
if (window.location.pathname.includes("/api/posts"))
{
    document.querySelector('#commentForm').addEventListener("submit", addCommentHandler);
}