import UU5 from "uu5g04";
import UuSubject from "uu_subject_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuSubject.SubjectsList`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuSubject.SubjectsList />);
    expect(wrapper).toMatchSnapshot();
  });
});
