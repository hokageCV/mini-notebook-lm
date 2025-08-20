import File from './file';
import Text from './text';
import Url from './url';

export default function Index() {
	return (
		<div className="flex flex-col w-full md:w-2/5 border border-border p-4 bg-card">
			<h2 className="text-lg font-semibold mb-3 text-foreground">
				Add data to context
			</h2>
      <Text />
			<File />
			<Url />
		</div>
	);
}
