import test from 'tape';
import hyclass from '../src';

test('hydrates single classNames correctly', t => {
    const hydrator = hyclass({
        btn: 'bg-blue text-white'
    });
    const className = hydrator('btn');
    t.equals(className, 'bg-blue text-white');
    t.end();
});

test('hydrates multiple classNames correctly', t => {
    const hydrator = hyclass({
        btn: 'bg-blue text-white',
        lg: 'text-lg p-4'
    });
    const className = hydrator('btn lg');
    t.equals(className, 'bg-blue text-white text-lg p-4');
    t.end();
});

test('does not hydrate extra classNames', t => {
    const hydrator = hyclass({
        btn: 'bg-blue text-white',
    });
    const className = hydrator('btn lg');
    t.equals(className, 'bg-blue text-white lg');
    t.end();
});


test('does not hydrate apply unused hydrators', t => {
    const hydrator = hyclass({
        bar: 'bar',
        btn: 'bg-blue text-white',
        lg: 'text-lg p-4',
        foo: 'foo',
    });
    const className = hydrator('btn lg');
    t.equals(className, 'bg-blue text-white text-lg p-4');
    t.end();
});

test('returns empty string if className string is empty', t => {
    const hydrator = hyclass({
        btn: 'bg-blue text-white',
    });
    const className = hydrator('');
    t.equals(className, '');
    t.end();
});

test('returns empty string if className string not provided', t => {
    const hydrator = hyclass({
        btn: 'bg-blue text-white',
    });
    const className = hydrator();
    t.equals(className, '');
    t.end();
});


test('returns empty string if className string is not a string', t => {
    const hydrator = hyclass({
        btn: 'bg-blue text-white',
    });
    const className = hydrator(['foo', 'bar']);
    t.equals(className, '');
    t.end();
});

test('returns provided className string if hydrators not an object', t => {
    const hydrator = hyclass('bg-blue text-white');
    const className = hydrator('foo bar');
    t.equals(className, 'foo bar');
    t.end();
});

test('returns combined className string when multiple hydrators are used', t => {
    const hydrators = {
        btn: 'bg-blue text-white',
    }
    const hydrators2 = {
        lg: 'text-lg p-4'
    }
    const hydrator1 = hyclass(hydrators);
    const hydrator2 = hyclass(hydrators2);
    const className = `${hydrator1('btn')} ${hydrator2('lg')}`;
    t.equals(className, 'bg-blue text-white text-lg p-4');
    t.end();
});

test('returns combined className string when hydrators are combined', t => {
    const hydrators = {
        btn: 'bg-blue text-white',
    }
    const hydrators2 = {
        lg: 'text-lg p-4'
    }
    const hydrator = hyclass({...hydrators, ...hydrators2});
    const className = hydrator('btn lg');
    t.equals(className, 'bg-blue text-white text-lg p-4');
    t.end();
});


test('returns overridden className string when hydrators are nested', t => {
    const hydrators = {
        btn: 'bg-blue',
    }
    const hydrators2 = {
        'bg-blue': 'bg-red'
    }
    const hydrator1 = hyclass(hydrators);
    const hydrator2 = hyclass(hydrators2);
    const className = hydrator2(hydrator1('btn'));
    t.equals(className, 'bg-red');
    t.end();
});