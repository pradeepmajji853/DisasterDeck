import React from 'react';
import './KnowledgeHub.css'; 

const blogPosts = [
  {
    id: 1,
    title: 'Preparing for Cyclones',
    date: 'August 18, 2017',
    author: 'Marion Dane Bauer',
    summary: 'Learn how to prepare for cyclones with these essential tips.',
    imageUrl: 'https://www.eurokidsindia.com/blog/wp-content/uploads/2023/11/cyclone-stages-formation-impact.jpg',
  },
  {
    id: 2,
    title: 'Flood Safety Measures',
    date: 'July 25, 2012',
    author: 'Heather Beal',
    summary: 'Stay safe during floods by following these guidelines.',
    imageUrl: 'https://www.ready.gov/sites/default/files/2020-04/Flooded-neighborhood_1.jpg',
  },
  {
    id: 3,
    title: 'Earthquake Preparedness',
    date: 'June 30, 2014',
    author: 'Rebecca Behrens',
    summary: 'Important steps to take before, during, and after an earthquake.',
    imageUrl: 'https://ca-times.brightspotcdn.com/dims4/default/9d7866e/2147483647/strip/false/crop/5000x3333+0+0/resize/1486x991!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ffb%2F8c%2Fb6e8796e450885f50ea8bc22dbec%2Fap23037523545482.jpg',
  },
];

const KnowledgeHub = () => {
  return (
    <div className="blog-container">
      {blogPosts.map(post => (
        <div key={post.id} className="blog-post">
          <img src={post.imageUrl} alt={post.title} className="blog-image" />
          <div className="blog-content">
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-meta">
              {post.date} by {post.author}
            </p>
            <p className="blog-summary">{post.summary}</p>
          </div>
        </div>
        
      ))}
      <a href="https://www.rand.org/blog.topic.natural-hazards.html" className="view-more-link">
        View More Blogs
      </a>
      
    </div>
  );
};

export default KnowledgeHub;