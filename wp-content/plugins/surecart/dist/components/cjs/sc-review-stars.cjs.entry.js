'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');

const scReviewStarsCss = ":host{display:flex;gap:var(--star-gap, 2px);--sc-review-stars-primary:var(--sc-color-gray-500)}sc-icon.full-star::part(svg){fill:var(--sc-review-stars-primary);stroke:var(--sc-review-stars-primary);color:var(--sc-review-stars-primary)}sc-icon.half-star::part(svg){stroke:var(--sc-review-stars-primary);color:var(--sc-review-stars-primary)}sc-icon.empty-star::part(svg){color:var(--sc-review-stars-primary)}";
const ScReviewStarsStyle0 = scReviewStarsCss;

const ScReviewStars = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
            return (index.h("sc-icon", { name: isHalf ? 'half-star' : 'star', class: {
                    'full-star': isFull,
                    'half-star': isHalf,
                    'empty-star': !isFull && !isHalf,
                }, style: {
                    width: `${this.size}px`,
                    height: `${this.size}px`,
                } }));
        });
        return index.h("div", { part: "base" }, stars);
    }
};
ScReviewStars.style = ScReviewStarsStyle0;

exports.sc_review_stars = ScReviewStars;

//# sourceMappingURL=sc-review-stars.cjs.entry.js.map