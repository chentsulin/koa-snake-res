TESTS = test/test.js

test:
	@NODE_ENV=test node \
		./node_modules/.bin/_mocha \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test node \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- -u exports \
		$(TESTS) \
		--bail

test-travis:
	@NODE_ENV=test node \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		$(TESTS) \
		--bail

.PHONY: test
