/* globals casper, document */
casper.test.begin('App is setup correctly', 2, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    test.assertExists('.audio', 'Audio should exist');
    test.assertExists('#container', 'Canvas should exist');
  });

  casper.run(function() {
    test.done();
  });
});
