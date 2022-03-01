.PHONY:	install format lint test sec
ISORT_ARGS=--trailing-comma --multi-line 3
DJANGO_SETTINGS_MODULE=config.settings

install:
		@poetry install
		@npm install
format:
		@blue backend
		@isort backend $(ISORT_ARGS)
lint:
		@blue backend --check
		@isort backend --check $(ISORT_ARGS)
pre-commit:
		@make lint
		@pip list --format=freeze > requirements.txt
		@git add requirements.txt
test:
		@prospector backend --with-tool pep257 --doc-warning
		@pytest backend -v
