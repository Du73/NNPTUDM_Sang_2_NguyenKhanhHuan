const API_URL = "http://localhost:3000";



const getNextId = (data) => {
  if (data.length === 0) return "1";
  const maxId = Math.max(...data.map(item => parseInt(item.id)));
  return (maxId + 1).toString();
};



async function getPosts() {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();
  renderPosts(posts);
}

async function createPost(title, views) {
  const res = await fetch(`${API_URL}/posts`);
  const posts = await res.json();
  
  const newPost = {
    id: getNextId(posts),
    title,
    views,
    isDeleted: false
  };

  await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  });
  getPosts();
}

async function softDeletePost(id) {
  await fetch(`${API_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isDeleted: true })
  });
  getPosts();
}

function renderPosts(posts) {
  console.clear();
  console.log("--- POSTS LIST ---");
  posts.forEach(post => {
    const style = post.isDeleted ? "text-decoration: line-through; color: gray;" : "";
    console.log(`%cID: ${post.id} | Title: ${post.title} | Views: ${post.views} ${post.isDeleted ? '[DELETED]' : ''}`, style);
  });
}



async function createComment(text, postId) {
  const res = await fetch(`${API_URL}/comments`);
  const comments = await res.json();
  
  const newComment = {
    id: getNextId(comments),
    text,
    postId: postId.toString()
  };

  await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment)
  });
}

async function updateComment(id, newText) {
  await fetch(`${API_URL}/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText })
  });
}

async function deleteComment(id) {
  await fetch(`${API_URL}/comments/${id}`, { method: 'DELETE' });
}

async function getComments() {
  const res = await fetch(`${API_URL}/comments`);
  const comments = await res.json();
  console.log("--- COMMENTS ---", comments);
}