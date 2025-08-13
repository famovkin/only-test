import { sectionsCount } from '../../types';

const calcMinStep = (
  currentSection: number | null,
  sectionCount: sectionsCount,
  nextSection: number
): number => {
  console.log('currentSection', currentSection)
  console.log('sectionCount', sectionCount)
  console.log('nextSection', nextSection)

  const currentPoint =
    (((currentSection || 0) % sectionCount) + sectionCount) % sectionCount;
  const nextPoint =
    ((nextSection % sectionCount) + sectionCount) % sectionCount;

  let delta = (nextPoint - currentPoint + sectionCount) % sectionCount;
  if (delta > sectionCount / 2) delta -= sectionCount;

  return -delta;
};

export { calcMinStep };
