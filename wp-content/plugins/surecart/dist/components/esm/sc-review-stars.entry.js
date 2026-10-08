import { r as registerInstance, h } from './index-25e5af33.js';

const scReviewStarsCss = ":host{display:flex;gap:var(--star-gap, 2px);--sc-review-stars-primary:var(--sc-color-gray-500)}sc-icon.full-star::part(svg){fill:var(--sc-review-stars-primary);stroke:var(--sc-review-stars-primary);color:var(--sc-review-stars-primary)}sc-icon.half-star::part(svg){stroke:var(--sc-review-stars-primary);color:var(--sc-review-stars-primary)}sc-icon.empty-star::part(svg){color:var(--sc-review-stars-primary)}";
const ScReviewStarsStyle0 = scReviewStarsCss;

const ScReviewStars = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.rating = 0;
        this.size = 20;
    }
    render() {
        const wholeStars = Math.floor(this.rating);
        const hasHalf = wholeStars < this.rating;
        const stars = Array.from({ length: 5 }).map((_, idx) => {
            const i = idx + 1;
            const isFull = i <= wholeStars;
            const isHalf = hasHalf && i === wholeStars + 1;
            return (h("sc-icon", { name: isHalf ? 'half-star' : 'star', class: {
                    'full-star': isFull,
                    'half-star': isHalf,
                    'empty-star': !isFull && !isHalf,
                }, style: {
                    width: `${this.size}px`,
                    height: `${this.size}px`,
                } }));
        });
        return h("div", { part: "base" }, stars);
    }
};
ScReviewStars.style = ScReviewStarsStyle0;

export { ScReviewStars as sc_review_stars };

//# sourceMappingURL=sc-review-stars.entry.js.map