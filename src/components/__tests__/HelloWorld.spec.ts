import 'jest';
import axios from 'axios';
import {shallowMount} from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';

describe('HelloWorld.vue', () => {
  let wrapper;
  let getStub;

  const TEST_QUERY = 'iphone';
  const TEST_BOOK_TITLE = 'iPhone(アイフォーン) SDK(エスディーケー)の教科書';

  beforeEach(() => {
    getStub = jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        items: [
          {
            volumeInfo: {title: TEST_BOOK_TITLE}
          }
        ]
      }
    });

    wrapper = shallowMount(HelloWorld);
  });

  it('displays search input', () => {
    expect(wrapper.find('input').exists()).toBeTruthy();
  });

  it('displays search input with placeholder', () => {
    expect(wrapper.find('input').attributes().placeholder).toBe('foo');
  });

  it('displays search button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy();
  });

  describe('When search button is clicked', () => {
    beforeEach(() => {
      wrapper.find('input').setValue(TEST_QUERY);
      wrapper.find('button').trigger('click');
    });

    it('calls book search API', () => {
      expect(getStub).toBeCalledWith('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: TEST_QUERY
        }
      });
    });

    it('displays book title', () => {
      expect(wrapper.text()).toContain(TEST_BOOK_TITLE);
    });
  });

  describe('When query length greater than 20', () => {
    beforeEach(() => {
      wrapper.find('input').setValue(Array(21).fill('a').join(''));
      wrapper.find('button').trigger('click');
    });

    it('does NOT display book title', () => {
      expect(wrapper.text()).not.toContain(TEST_BOOK_TITLE);
    });

    const TEST_ERROR = 'Plz input 20 characters or less';
    it('displays error message', () => {
      expect(wrapper.text()).toContain(TEST_ERROR);
    });

    describe('When query length less than 20', () => {
      beforeEach(() => {
        wrapper.find('input').setValue(Array(19).fill('a').join(''));
        wrapper.find('button').trigger('click');
      });

      it('does NOT displays error', () => {
        expect(wrapper.text()).not.toContain(TEST_ERROR);
      });
    });
  });
});
