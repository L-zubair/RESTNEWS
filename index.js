// Add event listener to the 'fetch-posts' button
document.getElementById('fetch-posts').addEventListener('click', fetchPosts);

function fetchPosts() {
  // Fetch posts from the API
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      const postsContainer = document.getElementById('posts-container');
      // Clear the posts container
      postsContainer.innerHTML = '';

      // Iterate over each post
      posts.forEach(post => {
        // Create a new div element for each post
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Fetch user data for each post
        fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
          .then(userResponse => userResponse.json())
          .then(user => {
            // Populate the post element with post and user data
            postElement.innerHTML = `
               <div class="box">
                  <h2 class="title">${post.title}</h2>
                  <p>${post.body}</p>
                  <h3>User Info:</h3>
                  <p class="b">Name: ${user.name}</p>
                  <p>Email: ${user.email}</p>
               </div>
            `;
          })
          .catch(error => console.error('Error fetching user:', error));

        // Append the post element to the posts container
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => console.error('Error fetching posts:', error));
}
