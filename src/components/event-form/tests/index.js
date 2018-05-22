import MockDate from 'mockdate';
import { map, range } from 'lodash';

import {
  buildSnapshotAssertion, buildShallowRenderer, buildJssClassNames,
} from '~/src/test/utils';

import EventFormSection from '../section';
import { EventForm, initialValues } from '../';

MockDate.set('2017-12-25');

describe('EventForm', () => {
  const event = {
    title: 'Event title',
    place: { id: 'pid 1' },
    description: 'Event description',
    categories: [1, 2, 3].map(i => ({ id: `cid ${i}` })),
    prices: [10, 20].map(p => ({ price: p })),
    discountLists: [1, 2, 3].map(i => ({ id: `dlid ${i}` })),
    flyer: 'imgs.com/flyer.png',
    start: '2017-12-31T22:00:00+00:00',
    end: '2018-01-01T03:00:00+00:00',
  };

  const buildProps = (props) => ({
    event,
    onSubmit: jest.fn(),
    onError: jest.fn(),
    onGraphqlError: jest.fn(),
    onToggle: jest.fn(),
    expanded: [],
    classes: {},
    ...props,
  });

  const assertSnapshot = buildSnapshotAssertion(EventForm);
  const renderForm = props => buildShallowRenderer(EventForm)(buildProps(props));

  it('should properly render empty form', () => {
    assertSnapshot({});
  });

  it('should properly render form with an event', () => {
    assertSnapshot({ event });
  });

  describe('validate', () => {
    const validEvent = initialValues(event);

    const mandatoryError = 'Campo obrigatório';

    const assertForm = async (outcome, props, response) => {
      const values = { ...validEvent, ...props };
      const onError = jest.fn();
      const promise = renderForm({ onError }).prop('validate')(values);
      await expect(promise)[outcome].toEqual(response || values); // eslint-disable-line jest/valid-expect
      if (outcome === 'rejects') {
        expect(onError).toHaveBeenCalled();
      }
    }

    const assertValidForm = (props) => assertForm('resolves', props);
    const assertFormError = (props, error = {}) => assertForm('rejects', props, error);

    it('should catch title errors', async () => {
      await assertValidForm({ title: 'Valid title' });

      await assertFormError({ title: '' }, { title: mandatoryError });
      await assertFormError(
        { title: 'This title will surpass the maximum limit' },
        { title: 'Máximo de 40 caracteres' },
      );
    });

    it('should catch flyer errors', async () => {
      const validUrlFlyer = { url: 'valid-flyer.com' };
      const validImgFlyer = {
        size: 3145728,
        type: 'image/png',
      };

      await assertValidForm({ flyer: validUrlFlyer });
      await assertValidForm({ flyer: validImgFlyer });

      await assertFormError({ flyer: {} }, { flyer: mandatoryError });
      await assertFormError(
        { flyer: { ...validImgFlyer, size: 0 } },
        { flyer: mandatoryError },
      );
      await assertFormError(
        { flyer: { ...validImgFlyer, type: 'raw/txt' } },
        { flyer: 'A imagem deve ser do formato \'.png\' ou \'.jpg\'.' },
      );
      await assertFormError(
        { flyer: { ...validImgFlyer, size: validImgFlyer + 1 } },
        { flyer: 'A imagem não pode ter mais de 5mb.' },
      );
    });

    it('should catch start errors', async () => {
      await assertValidForm({ start: Date.now() + 1 });

      await assertFormError(
        { start: Date.now() - 1 },
        { start: 'Por favor, insira uma data futura.' },
      );
    });

    it('should catch end errors', async () => {
      const start = Date.now() + 1;

      await assertValidForm({ start, end: start + 1 });

      await assertFormError(
        { start, end: start },
        { end: 'Por favor, insira uma data após a data de início.' },
      );
    });

    it('should catch place errors', async () => {
      const validIdPlace = { id: 'pid 1' };
      const validPlace = {
        name: 'place name',
        address: 'place address',
        coordinates: 'place coordinates',
      };

      await assertValidForm({ place: validIdPlace });
      await assertValidForm({ place: validPlace });

      const assertions = map(validPlace, (_, prop) => (
        assertFormError(
          { place: { ...validPlace, [prop]: '' } },
          { place: mandatoryError },
        )
      ));

      await Promise.all(assertions);
    });
  });

  describe('onSubmit', () => {
    it('should call given onSubmit prop then set submitting as false', async () => {
      const onSubmit = jest.fn(() => Promise.resolve());
      const setSubmitting = jest.fn();
      renderForm({ onSubmit }).simulate('submit', event, { setSubmitting });

      expect(onSubmit).toHaveBeenCalledWith(event);
      expect(setSubmitting).not.toHaveBeenCalled();

      await Promise.resolve();

      expect(setSubmitting).toHaveBeenCalledWith(false);
    });

    it('should trigger onGraphqlError when submission fails', async () => {
      const onSubmit = jest.fn(() => Promise.reject('error'));
      const setSubmitting = jest.fn();
      const onGraphqlError = jest.fn();

      renderForm({ onSubmit, onGraphqlError })
        .simulate('submit', event, { setSubmitting });

      expect(onGraphqlError).not.toHaveBeenCalled();

      await Promise.resolve();

      expect(setSubmitting).not.toHaveBeenCalled();
      expect(onGraphqlError).toHaveBeenCalledWith('error');
    });
  });

  describe('render', () => {
    it('should properly render all form sections', () => {
      const props = {
        classes: buildJssClassNames(['root', 'submit']),
        expanded: [false, true, true, false, false],
      };

      buildSnapshotAssertion(renderForm(props).prop('render'))({
        handleSubmit: jest.fn(),
        isSubmitting: false,
        formProp: 'extra form prop',
      });
    });

    it('should pass onToggle to each form section', () => {
      const onToggle = jest.fn();
      const inner = buildShallowRenderer(renderForm({ onToggle }).prop('render'))({});

      range(5).forEach((i) => {
        inner.find(EventFormSection).at(i).simulate('toggle');
        expect(onToggle).toHaveBeenCalledWith(i);
      });
    });
  });
});
