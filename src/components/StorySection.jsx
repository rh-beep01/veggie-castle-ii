import React from 'react';
import { Flame, Heart, Sparkles, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function StorySection() {
  return (
    <section className="story-section section-padding" id="story">
      <div className="container">
        <div className="story-grid">
          <div className="story-image-column">
            <div className="story-image-main">
              <img 
                src="/images/galbi-sizzling.png" 
                alt="Tofu Chon Authentic Sizzling Galbi" 
                className="story-main-img"
              />
              <div className="story-stamp-badge">
                <span className="stamp-korean">{RESTAURANT_INFO.koreanName}</span>
                <span className="stamp-sub">Authentic Recipe</span>
              </div>
            </div>
            <div className="story-image-sub">
              <img 
                src="/images/mix-soon-tofu.png" 
                alt="Bubbling Soon Tofu in Stone Pot" 
                className="story-sub-img"
              />
            </div>
          </div>

          <div className="story-text-column">
            <span className="badge badge-gold">
              <Sparkles size={14} /> The Soul of Koreatown
            </span>
            <h2 className="story-title">Crafted with Patience, Simmered in Stone</h2>
            
            <p className="story-paragraph">
              At <strong>Tofu Chon (두부촌)</strong> on 8th Street, every meal begins with honor for Korean culinary heritage. Our signature Soon Tofu broth is slow-simmered for over 24 hours using dried anchovy, charred sea kelp, and prime beef bone stock to build an unmistakable, soothing depth of flavor.
            </p>

            <p className="story-paragraph">
              Each stone pot (<em>ttukbaegi</em>) is heated over high flames and arrives at your table violently bubbling, ready for you to crack a fresh country egg directly into the broth. Paired with our flame-charred LA Galbi marinated in fruit-infused soy, freshly fried yellow croaker, and crisp scallion pancakes, dinner here is hearty comfort at its finest.
            </p>

            <div className="story-pillars">
              <div className="pillar-item">
                <div className="pillar-icon-wrap">
                  <Flame size={20} />
                </div>
                <div>
                  <h4>Stone Pot Boil</h4>
                  <p>Retains blistering heat until the very last grain of rice.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-wrap">
                  <Heart size={20} />
                </div>
                <div>
                  <h4>Made From Scratch Daily</h4>
                  <p>Hand-curated kimchi, seasoned banchan, and fresh silken tofu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
