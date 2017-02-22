/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const args = process.argv.slice(2);

if (!args.length) {
  throw Error('Enter the script name, see in scripts folder.');
}

args.forEach((s) => {
  const [module] = s.split(':');
  require(`./${module}`);
});

