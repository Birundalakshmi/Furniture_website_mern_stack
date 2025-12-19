import React, { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';

const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const postsPerPage = 6;

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for Choosing the Perfect Sofa',
      excerpt: 'Discover how to select the ideal sofa that combines comfort, style, and durability for your living space.',
      content: `Choosing the perfect sofa is one of the most important decisions you'll make for your living space. Here are our top 10 tips:

1. Measure Your Space: Before shopping, measure your room carefully. Consider doorways, hallways, and the sofa's final position.

2. Think About Your Lifestyle: Do you have kids or pets? Choose durable, easy-to-clean fabrics. If you entertain often, consider a sectional.

3. Test for Comfort: Always sit on a sofa before buying. Check the seat depth, cushion firmness, and back support.

4. Choose Quality Construction: Look for hardwood frames, eight-way hand-tied springs, and high-density foam cushions.

5. Consider the Style: Your sofa should complement your existing decor while standing the test of time.

6. Select the Right Fabric: Leather is durable and ages well. Microfiber resists stains. Natural fabrics offer breathability.

7. Pay Attention to Color: Neutral colors are versatile, but don't be afraid of bold choices if they suit your style.

8. Check the Details: Look at stitching quality, zipper construction, and leg stability.

9. Think Long-Term: A good sofa is an investment. Choose something you'll love for years.

10. Read Reviews: Check online reviews and ask friends about their experiences with different brands.`,
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=500&fit=crop',
      author: 'Sarah Johnson',
      date: 'Dec 10, 2025',
      comments: 12,
      category: 'Interior Design'
    },
    {
      id: 2,
      title: 'Minimalist Bedroom Ideas for 2025',
      excerpt: 'Explore the latest trends in minimalist bedroom design and create a serene sanctuary in your home.',
      content: `Minimalism in the bedroom creates a peaceful retreat from the chaos of daily life. Here's how to achieve it:

The Foundation of Minimalist Design:
Start with a neutral color palette. Whites, grays, and earth tones create a calming atmosphere. Your bed should be the focal point, so invest in quality bedding with clean lines.

Declutter Ruthlessly:
Remove everything that doesn't serve a purpose or bring you joy. Keep surfaces clear and use hidden storage solutions.

Furniture Selection:
Choose pieces with simple, clean lines. A platform bed, streamlined nightstands, and a simple dresser are all you need.

Lighting Matters:
Natural light is crucial. Use sheer curtains or no curtains at all. Add subtle lighting with simple pendant lights or minimalist table lamps.

Textural Interest:
Without clutter, texture becomes important. Mix linen, cotton, and wood to add warmth without visual noise.

The Power of Less:
Remember, minimalism isn't about deprivation—it's about making room for what matters most.`,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=500&fit=crop',
      author: 'Michael Chen',
      date: 'Dec 8, 2025',
      comments: 8,
      category: 'Bedroom'
    },
    {
      id: 3,
      title: 'How to Mix Modern and Traditional Furniture',
      excerpt: 'Learn the art of blending contemporary pieces with classic furniture to create a unique and timeless look.',
      content: `Mixing modern and traditional furniture creates spaces with character and depth. Here's your guide:

Start with a Vision:
Decide which style will dominate. Use the 80/20 rule—80% one style, 20% the other.

Find Common Ground:
Look for pieces that share similar colors, materials, or scale. This creates visual harmony.

Balance is Key:
If you have a traditional sofa, pair it with modern accent chairs. If your dining table is modern, use traditional chairs.

Use Transitional Pieces:
Some furniture straddles both styles. These pieces help bridge the gap between modern and traditional.

Play with Contrast:
A sleek modern coffee table can look stunning with a traditional tufted sofa. The contrast makes each piece stand out.

Unify with Color:
Use a cohesive color palette throughout to tie different styles together.

Don't Overthink It:
Trust your instincts. If two pieces look good together to you, they probably do.`,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=500&fit=crop',
      author: 'Emily Roberts',
      date: 'Dec 5, 2025',
      comments: 15,
      category: 'Styling Tips'
    },
    {
      id: 4,
      title: 'Small Space, Big Style: Furniture Solutions',
      excerpt: 'Maximize your small living area with smart furniture choices and clever design strategies.',
      content: `Living in a small space doesn't mean sacrificing style. Here's how to make it work:

Multi-Functional Furniture:
Invest in pieces that serve multiple purposes. Sofa beds, storage ottomans, and extendable dining tables are your friends.

Vertical Space:
Look up! Use tall bookcases, wall-mounted shelves, and hanging storage to maximize vertical space.

Light and Bright:
Light colors make spaces feel larger. Use mirrors strategically to reflect light and create depth.

Scale Appropriately:
Choose furniture sized for your space. A massive sectional will overwhelm a small room.

Clear Pathways:
Maintain clear walking paths. Avoid placing furniture where it blocks natural traffic flow.

Strategic Storage:
Hidden storage is crucial. Look for beds with drawers, coffee tables with shelves, and benches with storage.

Flexible Seating:
Poufs, folding chairs, and stackable stools can be stored when not needed.

Remember: Less is more in small spaces. Every piece should earn its place.`,
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=500&fit=crop',
      author: 'David Lee',
      date: 'Dec 3, 2025',
      comments: 5,
      category: 'Space Planning'
    },
    {
      id: 5,
      title: 'Sustainable Furniture: Why It Matters',
      excerpt: 'Understanding the importance of eco-friendly furniture and how to make sustainable choices for your home.',
      content: `Sustainable furniture isn't just a trend—it's a responsibility. Here's what you need to know:

The Environmental Impact:
Traditional furniture production contributes to deforestation, pollution, and waste. Sustainable choices help reduce this impact.

What Makes Furniture Sustainable:
- Reclaimed or FSC-certified wood
- Non-toxic finishes and adhesives
- Recycled or recyclable materials
- Local production (reduced shipping emissions)
- Durability (lasting furniture means less waste)

Certifications to Look For:
FSC, Greenguard, and Cradle to Cradle certifications ensure environmental standards are met.

The True Cost:
Sustainable furniture may cost more initially, but its durability and timeless design make it a better long-term investment.

Making the Switch:
Start small. Choose one sustainable piece at a time. Consider buying vintage or refurbishing existing furniture.

The Bigger Picture:
Every sustainable choice supports ethical production, protects forests, and reduces waste. Your furniture decisions matter.`,
      image: 'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800&h=500&fit=crop',
      author: 'Lisa Anderson',
      date: 'Nov 30, 2025',
      comments: 18,
      category: 'Sustainability'
    },
    {
      id: 6,
      title: 'The Ultimate Dining Room Setup Guide',
      excerpt: 'Create the perfect dining space with our comprehensive guide to furniture selection and arrangement.',
      content: `Your dining room is where memories are made. Here's how to set it up perfectly:

Choosing Your Table:
Consider your space and how many people you regularly host. Round tables encourage conversation, while rectangular tables fit more people.

Table Size Guidelines:
Allow 24 inches of table space per person. Leave at least 36 inches between the table and walls for comfortable movement.

Seating Selection:
Chairs should be comfortable for long meals. Consider armchairs at the heads for a formal look, or mix chair styles for eclecticism.

Lighting is Crucial:
Hang a chandelier or pendant 30-36 inches above the table. Use a dimmer switch to adjust ambiance.

Storage Solutions:
A sideboard or buffet provides serving space and storage for dinnerware and linens.

Creating Atmosphere:
Add a rug to define the space and absorb sound. Choose artwork that complements your style without overwhelming the room.

The Finishing Touches:
Fresh flowers, coordinated table linens, and thoughtful place settings make every meal special.

Remember: Your dining room should reflect your personality and facilitate the gatherings you love.`,
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=500&fit=crop',
      author: 'James Wilson',
      date: 'Nov 28, 2025',
      comments: 10,
      category: 'Dining Room'
    }
  ];

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-terracotta-600 hover:text-terracotta-700 mb-6 transition"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </button>

          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-terracotta-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {selectedPost.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {selectedPost.title}
              </h1>

              <div className="prose max-w-none">
                {selectedPost.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-gradient-to-r from-charcoal-800 to-terracotta-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Furnix Blog</h1>
          <p className="text-xl text-white/90">
            Tips, trends, and inspiration for your home
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
/>
<div className="absolute top-4 left-4 bg-terracotta-600 text-white px-3 py-1 rounded-full text-sm font-medium">
{post.category}
</div>
</div>
<div className="p-6">
<h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-terracotta-600 transition line-clamp-2">
{post.title}
</h2>
<p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

<button
onClick={() => handleReadMore(post)}
className="text-terracotta-600 font-medium hover:text-terracotta-700 transition"
>
Read More →
</button>
</div>
</article>
))}
</div>

    {totalPages > 1 && (
      <div className="flex justify-center items-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border border-gray-300 rounded-md transition ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-50'
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md transition ${
              currentPage === index + 1
                ? 'bg-terracotta-600 text-white'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border border-gray-300 rounded-md transition ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </div>
    )}
  </div>
</div>
);
};
export default BlogPage;