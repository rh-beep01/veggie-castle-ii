import React from 'react';
import { Flame, Heart, Sparkles, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function StorySection() {
  return (
    <section className="story-section section-padding" id="heritage">
      <div className="container">
        <div className="story-grid">
          <div className="story-image-column">
            <div className="story-image-main">
              <img 
                src="/images/vegan-feast-hero.jpg" 
                alt="Veggie Castle II Caribbean Vegan Feast" 
                className="story-main-img"
              />
              <div className="story-stamp-badge">
                <span className="stamp-korean">ITAL VITAL</span>
                <span className="stamp-sub">100% Plant-Based</span>
              </div>
            </div>
            <div className="story-image-sub">
              <img 
                src="/images/cold-pressed-juices.jpg" 
                alt="Fresh Cold Pressed Juices" 
                className="story-sub-img"
              />
            </div>
          </div>

          <div className="story-text-column">
            <span className="badge badge-gold">
              <Sparkles size={14} /> The Soul of South Richmond Hill
            </span>
            <h2 className="story-title">Cooked with Soul, Rooted in Ital Tradition</h2>
            
            <p className="story-paragraph">
              At <strong>Veggie Castle II</strong> on Liberty Avenue, every meal honors the rich traditions of Caribbean plant-based Ital cooking. Our dishes are seasoned with scotch bonnet peppers, fresh thyme, pimento, garlic, and coconut milk?simmered gently to cultivate unmistakable vitality and island flavor.
            </p>

            <p className="story-paragraph">
              From our famous jerk BBQ jackfruit and crispy fried oyster mushrooms to slow-simmered collard greens and raw cold-pressed juice cures, we believe food is natural medicine. Experience honest, hearty Caribbean comfort that nourishes the body and soul.
            </p>

            <div className="story-pillars">
              <div className="pillar-item">
                <div className="pillar-icon-wrap">
                  <Flame size={20} />
                </div>
                <div>
                  <h4>Simmered from Scratch Daily</h4>
                  <p>Fresh whole herbs, organic grains, and handcrafted vegan proteins.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-wrap">
                  <Heart size={20} />
                </div>
                <div>
                  <h4>Raw Cold-Pressed Juices</h4>
                  <p>100% raw juice cures, wheatgrass shots, and sea moss blends.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
