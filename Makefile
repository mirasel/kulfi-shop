f:
	cd frontend && npm run start

b:
	cd backend && php artisan serve

j:
	cd backend && php artisan queue:work

route:
	cd backend && php artisan route:list

clear:
	cd backend && php artisan cache:clear && php artisan route:clear && php artisan view:clear