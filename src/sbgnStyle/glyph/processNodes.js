const baseShapes = require('./baseShapes.js');
const auxiliaryItems = require('./auxiliaryItems.js');
const svgStr = require('../util/svg.js').svgStr;

const processNodes = {

  process (node) {
    const nw = node.width();
    const nh = node.height();

    const squareStyle = new Map()
    .set('stroke', '#6A6A6A')
    .set('stroke-width', '2')
    .set('fill', 'none');

    const processSvg =
    `
      ${baseShapes.square(1, 1, Math.min(nw, nh) - 2, squareStyle)}
    `;
    return svgStr(processSvg, nw, nh, 0, 0, nw, nh);
  },

  association (node) {
    const nw = node.width();
    const nh = node.height();

    const centerX = nw / 2;
    const centerY = nh / 2;
    const radius = (Math.min(nw, nh) - 2) / 2;

    const styleMap = new Map()
    .set('stroke', '#6A6A6A')
    .set('stroke-width', '2')
    .set('fill', '#6A6A6A')
    .set('fill-opacity', '0');

    const associationSvg =
    `
      ${baseShapes.circle(centerX, centerY, radius, styleMap)}
    `;
    return svgStr(associationSvg, nw, nh, 0, 0, nw, nh);
  },

  dissociation (node) {
    const nw = node.width();
    const nh = node.height();

    const centerX = node.width() / 2;
    const centerY = node.height() / 2;
    const outerRadius = (Math.min(nw, nh) - 2) / 2;
    const innerRadius = (Math.min(nw, nh) - 2) / 3;

    const styleMap = new Map()
    .set('stroke', '#6A6A6A')
    .set('stroke-width', '2')
    .set('fill', 'none');

    const dissociationSvg =
    `
      ${baseShapes.circle(centerX, centerY, outerRadius, styleMap)}
      ${baseShapes.circle(centerX, centerY, innerRadius, styleMap)}
    `;
    return svgStr(dissociationSvg, nw, nh, 0, 0, nw, nh);
  },

  phenotype (node) {
    const nw = node.width();
    const nh = node.height();

    const styleMap = new Map()
    .set('stroke', '#6A6A6A')
    .set('stroke-width', '3')
    .set('fill', 'none');

    const shapeArgs = [1, 1, nw - 3, nh - 3];

    let phenotypeSvg =
    `
      ${baseShapes.hexagon(...shapeArgs, styleMap)}
      ${node.data('clonemarker') ? auxiliaryItems.cloneMarker(nw - 3, nh - 3, baseShapes.hexagon, shapeArgs) : ''}
    `;
    return svgStr(phenotypeSvg, nw, nh, 0, 0, nw, nh);
  }
};

module.exports = processNodes;