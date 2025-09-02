import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const prevBtn =
      curPage > 1 ? this._generateButtonMarkup(curPage - 1, 'prev') : '';
    const nextBtn =
      curPage < numPages ? this._generateButtonMarkup(curPage + 1, 'next') : '';
    return prevBtn + nextBtn;

    // // Page 1, and there are other pages
    // if (curPage === 1 && numPages > 1) {
    //   return nextBtn;
    // }

    // // Last page
    // if (curPage === numPages && numPages > 1) {
    //   return prevBtn;
    // }

    // // Other page
    // if (curPage < numPages) {
    //   return prevBtn + nextBtn;
    // }

    // // Page 1, and there are NO other page
    // return '';
  }

  _generateButtonMarkup(curPage, type) {
    return `
      <button data-goto="${curPage}" class="btn--inline pagination__btn--${type}">
        ${
          type === 'prev'
            ? `
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage}</span>`
            : `
          <span>Page ${curPage}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>`
        }
      </button>
    `;
  }
}

export default new PaginationView();
