import { getIcons,icons } from './navigation';

describe('getIcons', () => {
  it('returns arrows circle svg', () => {
    const retIcons =  getIcons('arrow-circle');
    expect(retIcons.back).toEqual(icons['arrow-circle'].back);
    expect(retIcons.forward).toEqual(icons['arrow-circle'].forward);
  });
  it('returns arrows circle svg', () => {
    const retIcons =  getIcons('arrow-round');
    expect(retIcons.back).toEqual(icons['arrow-round'].back);
    expect(retIcons.forward).toEqual(icons['arrow-round'].forward);
  });
  it('returns null when icon name not arrow-circle or arrow-round', () => {
    const retIcons =  getIcons('arrow-square');
    expect(retIcons).toBeNull();
  });
});
